import * as sqlPool from '@cityssm/mssql-multi-pool'

import * as configFunctions from '../helpers/functions.config.js'

export async function addFavouriteCallOutList(
  listId: string,
  sessionUser: MonTYUser
): Promise<boolean> {
  const pool = await sqlPool.connect(configFunctions.getProperty('mssql'))

  try {
    await pool
      .request()
      .input('userName', sessionUser.userName)
      .input('listId', listId).query(`insert into MonTY.FavouriteCallOutLists
        (userName, listId)
        values (@userName, @listId)`)

    return true
  } catch {
    return false
  }
}
