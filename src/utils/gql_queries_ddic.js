import { gql } from "apollo-boost";


const GEN_SDL_FM = gql`
  query sdl($fmName:String!){
    sdl: generateFunctionModuleSDL(for:$fmName)
  }
`;

const GEN_SDL_CLASS = gql`
  query sdl($className:String!){
    sdl: generateClassSDL(for:$className)
  }
`;

export {
  GEN_SDL_FM,
  GEN_SDL_CLASS
};