interface config {
  types: string[]
}

export default {
  default: (): config => ({
    types: []
  }),
  validator(config: config) {
    if (!config.types.length) {
      throw new Error("the config parameter 'types' should be a non-empty array of type names.")
    }
  },
};
