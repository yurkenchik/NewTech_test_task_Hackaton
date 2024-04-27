from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update

from database.models import Banner, User

"""|||||||||||||||||||| БАНЕР і інформаційні сторінки |||||||||||||||||||||||||"""


async def orm_add_banner_description(session: AsyncSession, data: dict):
    query = select(Banner)
    result = await session.execute(query)
    if result.first():
        return
    session.add_all([Banner(name=name, description=description) for name, description in data.items()])
    await session.commit()


async def orm_change_banner_image(session: AsyncSession, name: str, image: str):
    query = update(Banner).where(Banner.name == name).values(image=image)
    await session.execute(query)
    await session.commit()


async def orm_get_banner(session: AsyncSession, page: str):
    query = select(Banner).where(Banner.name == page)
    result = await session.execute(query)
    return result.scalar()


async def orm_get_info_pages(session: AsyncSession):
    query = select(Banner)
    result = await session.execute(query)
    return result.scalars().all()


"""||||||||||||||||| Добавлення юхера в БД ||||||||||||||||||||||||"""


async def orm_add_user(
        session: AsyncSession,
        user_id: int,
        first_name: str | None = None,
        last_name: str | None = None,
        phone: str | None = None,
):
    query = select(User).where(User.user_id == user_id)
    result = await session.execute(query)
    if result.first() is None:
        session.add(
            User(user_id=user_id, first_name=first_name, last_name=last_name, phone=phone)
        )
        await session.commit()
