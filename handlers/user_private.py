from aiogram import F, types, Router
from aiogram.filters import CommandStart, Command
from sqlalchemy.ext.asyncio import AsyncSession

# from sqlalchemy.ext.asyncio import AsyncSession

from handlers.menu_processing import get_menu_content

# from keyboards.inline import MenuCallBack, get_callback_btns


user_private_router = Router()


@user_private_router.message(CommandStart())
async def start_cmd(message: types.Message, session: AsyncSession):
    media, reply_markup = await get_menu_content(session, level=0, menu_name='main')

    await message.reply_photo(media.media, caption=media.caption, reply_markup=reply_markup)


@user_private_router.callback_query(F.data.startswith('help'))
async def help(callback: types.CallbackQuery, session: AsyncSession):
    media, reply_markup = await get_menu_content(session, level=0, menu_name='help')

    await callback.message.answer_photo(media.media, caption=media.caption, reply_markup=reply_markup)

@user_private_router.callback_query(F.data.startswith('info'))
@user_private_router.message(Command('info'))
async def info(callback: types.CallbackQuery, session: AsyncSession):
    media, reply_markup = await get_menu_content(session, level=0, menu_name='info')

    await callback.message.answer_photo(media.media, caption=media.caption, reply_markup=reply_markup)


@user_private_router.callback_query(F.data.startswith('emergency_call'))
@user_private_router.message(Command('emergency_call'))
async def emergency_call(callback: types.CallbackQuery, session: AsyncSession):
    media, reply_markup = await get_menu_content(session, level=0, menu_name='emergency_call')

    await callback.message.answer_photo(media.media, caption=media.caption, reply_markup=reply_markup)


@user_private_router.callback_query(F.data.startswith('receive_emergencies'))
@user_private_router.message(Command('receive_emergencies'))
async def receive_emergencies(callback: types.CallbackQuery, session: AsyncSession):
    media, reply_markup = await get_menu_content(session, level=0, menu_name='receive_emergencies')

    await callback.message.answer_photo(media.media, caption=media.caption, reply_markup=reply_markup)


@user_private_router.callback_query(F.data.startswith('support'))
@user_private_router.message(Command('support'))
async def support(callback: types.CallbackQuery, session: AsyncSession):
    media, reply_markup = await get_menu_content(session, level=0, menu_name='support')

    await callback.message.answer_photo(media.media, caption=media.caption, reply_markup=reply_markup)
