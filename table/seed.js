const Hamoni = require("hamoni-sync");
let hamoni = new Hamoni("dadf86df-b99f-4acb-a5f8-0ec53d1a4d0b", "794077bb007849d9bce20a7cdcc8d6a8");
hamoni
  .connect()
  .then(response => {
    hamoni
      .createList("datagrid", [
        { firstName: "James", lastName: "Darwin" },
        { firstName: "Jimmy", lastName: "August" }
      ])
      .then(() => console.log("create success"))
      .catch(console.log);
  })
  .catch(console.log);