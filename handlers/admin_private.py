from aiogram import F, Router, types
from aiogram.filters import Command, StateFilter
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import StatesGroup, State

from sqlalchemy.ext.asyncio import AsyncSession

from database.orm_query import (
    orm_get_info_pages,
    orm_change_banner_image
)

from filters.chat_types import IsAdmin

# from keyboards.inline import get_callback_btns
from keyboards.reply import get_keyboard

admin_router = Router()
admin_router.message.filter(IsAdmin())

ADMIN_KB = get_keyboard(
    # "Список доступних змін",
    "Додати/змінити банер",
    placeholder="Виберіть дію",
    # sizes=(2,),
    sizes=(1,),
)


@admin_router.message(Command("admin"))
async def add_command(message: types.Message):
    await message.answer("Що хочете зробити, Ваша Величносте🤴?", reply_markup=ADMIN_KB)


"""|||||||||| Мікро FSM для загрузки/змінення банерів |||||||||||||||||||||||||||||||"""


class AddBanner(StatesGroup):
    image = State()


# Відправляємо усі наявні інформаційні сторінки бота і стаємо в режим очікування відправлення photo
@admin_router.message(StateFilter(None), F.text == 'Додати/змінити банер')
async def add_image2(message: types.Message, state: FSMContext, session: AsyncSession):
    pages_names = [page.name for page in await orm_get_info_pages(session)]
    await message.answer(f"Відправити фото банеру.\nВ описі вкажіть до якої сторінки банер\
                         \n{', '.join(pages_names)}")
    await state.set_state(AddBanner.image)


# Додаємо/змінюємо зображення в таблиці
@admin_router.message(AddBanner.image, F.photo)
async def add_banner(message: types.Message, state: FSMContext, session: AsyncSession):
    image_id = message.photo[-1].file_id
    for_page = message.caption.strip()
    pages_names = [page.name for page in await orm_get_info_pages(session)]
    if for_page not in pages_names:
        await message.answer(f"Введіть нормальну назву сторінки, наприклад:\
                         \n{', '.join(pages_names)}")
        return
    await orm_change_banner_image(session, for_page, image_id, )
    await message.answer("Банер доданий/змінений.")
    await state.clear()


# ловимо непідходящий ввід
@admin_router.message(AddBanner.image)
async def add_banner2(message: types.Message, state: FSMContext):
    await message.answer("Відправте фото банеру і при відправленні напишіть назву сторінки")
