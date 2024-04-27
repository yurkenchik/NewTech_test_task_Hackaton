from aiogram.types import BotCommand


private = [
    BotCommand(command='start', description='Розпочати роботу'),
    BotCommand(command='info', description='Інформація про бота'),
    BotCommand(command='help', description='Допомога з ботом'),
    BotCommand(command='emergency_call', description='Кинути терміновий запит'),
    BotCommand(command='receive_emergencies', description='Отримування термінових запитів'),
    BotCommand(command='support', description='Зв\'язок з нами'),
]
