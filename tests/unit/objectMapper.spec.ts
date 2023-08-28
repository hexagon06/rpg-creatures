import { data } from "autoprefixer";
import { expect } from "chai";

type IdItem = { id: string };
function stripper<T>(
  input: T & IdItem,
  store: (id: string, value: T) => Promise<void>
): Promise<void> {
  const value = { ...input } as T & Partial<IdItem>;
  delete value.id;
  return store(input.id, value);
}

async function fetcher<T>(
  id: string,
  fetch: (id: string) => Promise<T>
): Promise<T & IdItem> {
  const value = await fetch(id);
  return { ...value, id };
}

describe("objectMapper", () => {
  describe("stripper", () => {
    const source = { id: "my-id", value: 3, label: "a name" };
    let calledId = null as string | null;
    let calledValue = null as any;

    beforeEach(() => {
      calledId = null;
      calledValue = null;
    });

    function storeHandle(id: string, value: { value: number; label: string }) {
      calledId = id;
      calledValue = value;
      return Promise.resolve();
    }

    it("should call store with the id", async () => {
      await stripper(source, storeHandle);

      expect(calledId).to.eq("my-id");
    });

    it("should call store with the input without the id", async () => {
      await stripper(source, storeHandle);

      expect(calledValue).to.eql({
        value: 3,
        label: "a name",
      });
    });
  });

  describe("fetcher", () => {
    let calledId = null as string | null;

    beforeEach(() => {
      calledId = null;
    });

    function fetchHandle(id: string) {
      calledId = id;
      return Promise.resolve({
        value: 3,
        label: "a name",
      });
    }

    it("should call fetch with the id", async () => {
      await fetcher("my-id", fetchHandle);

      expect(calledId).to.eq("my-id");
    });

    it("should return the value from fetch with the id", async () => {
      const result = await fetcher("my-id", fetchHandle);

      expect(result).to.eql({
        id: "my-id",
        value: 3,
        label: "a name",
      });
    });
  });

  describe("mapper", () => {
    /**
     * The mapper should consolidate many (optional) objects to a single index
     * It should be possible to define multiple values in a single object based on the values of one or multiple other objects
     * the source objects should be children of one parent object.
     *
     * index
     * { id: 'my-id', name: 'character', player: 'JD' }
     * should be formed out of
     * { id: 'my-id',
     *   data:[
     *     { id: 'character-id', type: 'character', name: 'character', class: 'warrior' },
     *     { id: 'player-id', type: 'player', name: 'JD', age: 23 },
     *   ]
     * }
     * using map
     * {
     *    id: 'id',
     *    name: 'data[type=character]/name',
     *    player: 'data[type=player]/name',
     * }
     */

    const source = {
      id: "my-id",
      data: [
        {
          id: "character-id",
          type: "character",
          name: "character",
          class: "warrior",
        },
        { id: "player-id", type: "player", name: "JD", age: 23 },
      ],
    } as Source;
    // const map = {
    //   id: 'id',
    //   name: 'data[type=character]/name',
    //   player: 'data[type=player]/name',
    // }

    it("should create an index with the id of the source", () => {
      const result = mapper(source, (s) => ({ id: s.id }));

      expect(result.id).to.eq("my-id");
    });

    it("should only ", () => {});

    // we can still try:
    //- intersection of objects, where we only use the intersection of the source and a map object with default values
    //- just a simple mapTo and mapFrom function (source) => index, (index) => source
  });
});

type Source = {
  id: string;
  data: (Character | Player)[];
};

type Character = { id: string; type: string; name: string; class: string };
type Player = { id: string; type: string; name: string; age: number };

type SourceIndex = { id: string; name?: string; player?: string };

function mapper(
  source: Source,
  map: (source: Source) => SourceIndex
): SourceIndex {
  // type dataKeys = keyof typeof source
  // Object.keys(source).forEach((key) => {
  //   console.log(keyof dataKeys)
  // })
  const { id } = source;
  return {
    id,
  };
}
