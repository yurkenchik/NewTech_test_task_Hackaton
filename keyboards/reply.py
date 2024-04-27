from aiogram.types import ReplyKeyboardMarkup, KeyboardButton, ReplyKeyboardRemove, KeyboardButtonPollType
from aiogram.utils.keyboard import ReplyKeyboardBuilder


def get_keyboard(
        *btns: str,
        placeholder: str = None,
        request_contact: int = None,
        request_location: int = None,
        sizes: tuple[int] = (2,),
                ):
    """
    :param btns: купа кнопок
    :param placeholder: placeholder="Що вас цікавить" - те, що буде написано, там де текст писати
    :param request_contact: request_contact=4 - 1 (по індексу йде)  - і пишеш номер кнопки, яка буде це просити
    :param request_location: те саме, що контакт
    :param sizes: sizes=(2, 2, 1) - тобто в першому ряді - 2 кнопки, в 2 ряді теж, в 3 - одна
    """
    keyboard = ReplyKeyboardBuilder()

    for index, text in enumerate(btns, start=0):

        if request_contact and request_contact == index:
            keyboard.add(KeyboardButton(text=text, request_contact=True))

        elif request_location and request_location == index:
            keyboard.add(KeyboardButton(text=text, request_location=True))

        else:
            keyboard.add(KeyboardButton(text=text))

    return keyboard.adjust(*sizes).as_markup(
        resize_keyboard=True, input_field_placeholder=placeholder)


del_kbd = ReplyKeyboardRemove()


test_kb = ReplyKeyboardMarkup(
    keyboard=[
        [
            KeyboardButton(text='Створити опитування', request_poll=KeyboardButtonPollType()),
        ],
        [
            KeyboardButton(text='Спитати: чи Назар лох?🤷‍♂️', request_contact=True),
            KeyboardButton(text='Спитати: чи Сергій лох?😒', request_location=True),
        ]
    ]
)
