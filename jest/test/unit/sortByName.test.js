const sorting = require("../../app");

describe("Books names test suit", () => {
  it("Books names should be sorted in ascending order", () => {
    const input = ["Гарри Поттер", "Властелин Колец", "Волшебник изумрудного города"];
    const output = ["Властелин Колец", "Волшебник изумрудного города", "Гарри Поттер"];
    
    const result = sorting.sortByName(input);

    expect(result).toEqual(output);
  });
  it("Books names not should be sorted in ascending order", () => {
    const input = ["Гарри Поттер", "Гарри Поттер", "Гарри Поттер"];
    const output = ["Гарри Поттер", "Гарри Поттер", "Гарри Поттер"];
    
    const result = sorting.sortByName(input);

    expect(result).toEqual(output);
  });
});
