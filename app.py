import asyncio
import os

from aiogram import Bot, Dispatcher, types
from aiogram.enums import ParseMode

from dotenv import find_dotenv, load_dotenv

load_dotenv(find_dotenv())

from middlewares.db import DataBaseSession

from database.engine import create_db, drop_db, session_maker

from handlers.admin_private import admin_router
from handlers.user_private import user_private_router

from common.bot_cmds_list import private

API_TOKEN = os.getenv('TOKEN')
bot = Bot(token=API_TOKEN, parse_mode=ParseMode.HTML)
bot.my_admins_list = [1329615264, 6801300243, 1413818704, 1014099963, 1005558533]
dp = Dispatcher()

dp.include_router(admin_router)
dp.include_router(user_private_router)


async def on_startup(bot):
    # await drop_db()

    await create_db()


async def on_shutdown(bot):
    print('Бот ліг...')


async def main():
    dp.startup.register(on_startup)
    dp.shutdown.register(on_shutdown)

    dp.update.middleware(DataBaseSession(session_pool=session_maker))

    await bot.delete_webhook(drop_pending_updates=True)
    # await bot.delete_my_commands(scope=types.BotCommandScopeAllPrivateChats())
    # await bot.set_my_commands(commands=private, scope=types.BotCommandScopeAllPrivateChats())
    await dp.start_polling(bot, allowed_updates=dp.resolve_used_update_types())


if __name__ == "__main__":
    asyncio.run(main())
