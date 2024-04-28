from aiogram.filters.callback_data import CallbackData
from aiogram.types import InlineKeyboardButton
from aiogram.utils.keyboard import InlineKeyboardBuilder


# class MenuCallBack(CallbackData, prefix='/'):
#     level: int
#     menu_name: str
#     category: int | None = None
#     page: int = 1
#     command_id: int | None = None


def get_user_main_btns(*, level: int, sizes: tuple[int] = (1,)):
    keyboard = InlineKeyboardBuilder()
    btns = {
        'Інструкція до бота': 'help',
        'Інформація про сайт і бота': 'info',
        'Кинути терміновий запит': 'emergency_call',
        'Отримувати сповіщення термінових запитів': 'receive_emergencies',
        'Підтримка': 'support',
    }
    for text, data in btns.items():
        keyboard.add(InlineKeyboardButton(text=text, callback_data=data))

    return keyboard.adjust(*sizes).as_markup()


# def get_user_main_btns(*, level: int, sizes: tuple[int] = (1,)):
#     keyboard = InlineKeyboardBuilder()
#     btns = {
#         'Інструкція до бота': 'help',
#         'Інформація про сайт і бота': 'info',
#         'Кинути терміновий запит': 'emergency_call',
#         'Отримувати сповіщення термінових запитів': 'receive_emergencies',
#         'Підтримка': 'support',
#     }
#
#     for text, menu_name in btns.items():
#         keyboard.add(InlineKeyboardButton(text=text,
#                                           callback_data=MenuCallBack(level=level, menu_name=menu_name).pack()))
#
#     return keyboard.adjust(*sizes).as_markup()


# def get_callback_btns(*, btns: dict[str, str], sizes: tuple[int] = (2,)):
#     keyboard = InlineKeyboardBuilder()
#
#     for text, data in btns.items():
#         keyboard.add(InlineKeyboardButton(text=text, callback_data=data))
#
#     return keyboard.adjust(*sizes).as_markup()
