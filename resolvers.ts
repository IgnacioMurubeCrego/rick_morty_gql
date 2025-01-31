import { Character, Location, Episode } from "./types.ts";

type QueryCharacterArgs = {
	id: string;
};

type QueryCharactersByIdArgs = {
	ids: string[];
};

export const resolvers = {
	Character: {
		origin: async (parent: Character): Promise<Location | null> => {
			if (parent.origin) {
				const url = parent.origin.url;
				const location = await fetch(url);
				return location.json();
			} else return null;
		},
		location: async (parent: Character): Promise<Location | null> => {
			if (parent.location) {
				const url = parent.origin.url;
				const location = await fetch(url);
				return location.json();
			} else return null;
		},
		episode: async (parent: Character): Promise<Episode[]> => {
			if (parent.episode) {
				const urls: string[] = parent.episode;
				const episodes = urls.map(async (u: string) => await fetch(u).then(async (e) => await e.json()));
				const documents = await Promise.all(episodes);
				return documents;
			} else return [];
		},
	},
	Location: {
		residents: async (parent: Location): Promise<Character[]> => {
			if (parent.residents) {
				const urls: string[] = parent.residents;
				const residents = urls.map(async (u: string) => await fetch(u).then(async (e) => await e.json()));
				const documents = await Promise.all(residents);
				return documents;
			} else return [];
		},
	},
	Episode: {
		characters: async (parent: Episode): Promise<Character[]> => {
			if (parent.characters) {
				const urls: string[] = parent.characters;
				const characters = urls.map(async (u: string) => await fetch(u).then(async (e) => await e.json()));
				const documents = await Promise.all(characters);
				return documents;
			} else return [];
		},
	},
	Query: {
		character: async (_parent: unknown, args: QueryCharacterArgs): Promise<Character> => {
			const id = args.id;
			const url = "https://rickandmortyapi.com/api/character/" + id;
			const character = await fetch(url);
			return character.json();
		},
		charactersByIds: async (_parent: unknown, args: QueryCharactersByIdArgs): Promise<Character[]> => {
			const ids = args.ids;
			const url = "https://rickandmortyapi.com/api/character";
			const characters = await Promise.all(
				ids.map(async (id) => {
					const character = await fetch(url + id);
					return character.json();
				})
			);
			return characters;
		},
	},
};
