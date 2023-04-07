export {};

const x = async (_: string) => {
  const { default: data } = await import(`../data/${_}`, {
    assert: { type: "json" },
  });
  return data;
};

console.log(await x("arbitrum.json"));
