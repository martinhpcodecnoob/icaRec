/* import { MongoClient, ObjectId } from "mongodb"
import clientPromise from "./mongodb"

export async function getProviderFromDatabase(userId) {
  const client = await clientPromise
  try {
    const db = client.db("test")
    const usersCollection = db.collection("custom-users-collection")

    const user = await usersCollection.findOne({ _id: new ObjectId(userId) })

    if (user && user.provider) {
      return user.provider
    }

    return null
  } catch (error) {
    console.error("Error getting provider from database:", error)

    return null
  }
}

// Función para guardar el token de acceso en la base de datos
export async function saveAccessTokenInDatabase(userId, tokenData) {
  const client = await clientPromise
  console.log("dentro del saveAcces:")
  try {
    console.log("dentro del saveAcces: TRY CATCH")
    const db = client.db("test")
    console.log("db:",db)
    const usersCollection = db.collection("custom-users-collection");
    console.log("userCollection;:", usersCollection)

    await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: tokenData }
    )
  } catch (error) {
    console.error("Failed to save access token to database:", error)
  }
} */