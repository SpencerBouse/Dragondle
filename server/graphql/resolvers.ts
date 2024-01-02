import { Characters } from "../db/connection";
import { Character } from "../model/Character";
import { GraphQLError } from 'graphql';
import { ObjectId } from "mongodb";

export const resolvers = {
  Query: {
    characters: () => {
      try { return Characters.find().exec() }
      catch (err) { return err }
    },
    characterById: async (root: any, id: string ) => {
      const charId = new ObjectId(id);
      try { return await Characters.findOne({_id: charId}).orFail()}
      catch(err) { console.log(err) }
    }
  },
  Mutation: {
    addCharacter: async (root: any, { character }: any) => {
      const newCharacter = new Characters({ ...character });

      try{
        if(await Characters.findOne({name: newCharacter.name}).exec()){
          throw new GraphQLError("A Character with that name already exists", {
            extensions: {
              code: 400
            }
          })
        }
        if(newCharacter.hints.length<3 || !(newCharacter.hints.some(hint=> hint.level === 'easy') && newCharacter.hints.some(hint=> hint.level === 'medium') && newCharacter.hints.some(hint=> hint.level === 'hard'))){
          throw new GraphQLError("Hints must include easy, medium, and, hard levels", {
            extensions: {
              code: 400
            }
          })
        }
        if(newCharacter.hints.length>3){
          throw new GraphQLError("Too many Hints, Maximum of 3.", {
            extensions: {
              code: 400
            }
          })
        }

        const char = newCharacter.save()
        return {
          code: 200,
          success: true,
          message: "Character Added Successfully.",
          character: char
        }
      }
      catch(err: any){ 
        return {
          code: err.extensions.code,
          success: false,
          message: err.message
        }
       }
    }
  }
}