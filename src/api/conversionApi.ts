// import { ref } from '@vue/composition-api'
import { IdItem } from "rpg-vue-base";
import { ApiCreate, ApiGet, ApiList } from "./genericApi";
import { ref } from "vue";

type ConversionState = "waiting" | "initializing" | "working" | "done";

interface ApiGetList<T extends IdItem> extends ApiGet<T>, ApiList<T> {}

export class Converter<TOld extends IdItem, TNew extends IdItem> {
  state = ref<ConversionState>("waiting");
  total = ref(0);
  done = ref(0);

  constructor(
    private oldApi: ApiGetList<TOld>,
    private newApi: ApiCreate<TNew>,
    private converter: (old: TOld) => TNew
  ) {}

  async start() {
    this.state.value = "initializing";
    var indexes = await this.oldApi.list();
    this.total.value = indexes.length;
    this.done.value = 0;
    this.state.value = "working";
    for (const { id } of indexes) {
      if (id === undefined) throw Error(`id of index was undefined`);
      var old = await this.oldApi.get(id);

      if (old === undefined)
        throw Error(`could not get old creature with id '${id}'`);
      var converted = this.converter(old);

      await this.newApi.create(converted);
      this.done.value = this.done.value + 1;
    }
    this.state.value = "done";
  }
}
