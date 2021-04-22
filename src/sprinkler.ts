import { Machine, assign, send } from "xstate";

const sprinklerMachine = Machine(
  {
    id: "sprinkler",
    type: "parallel",
    context: {
      moisture_level: 100,
      decrement_value_rate: 2,
      increment_value_rate: 4,
    },
    states: {
      ticker: {
        entry: [send("TICK")],
        on: {
          TICK: [
            {
              cond: "deadCond",
              target: "moisture.dead",
            },
            {
              actions: [
                "decrement_moisture_level",
                send("TICK", { delay: 1000 }),
              ],
            },
          ],
        },
      },
      moisture: {
        initial: "wet",
        states: {
          dry: {
            on: {
              SPRINKLE: [
                {
                  cond: "dryCond",
                  target: "dry",
                  actions: ["increment_moisture_level", "sprinkle"],
                },
              ],
            },
          },
          moist: {
            always: {
              cond: "dryCond",
              target: "dry",
            },
          },
          wet: {
            entry: [send("TICK")],
            always: {
              cond: "moistCond",
              target: "moist",
            },
          },
          dead: {
            on: {
              RESET: {
                cond: "deadCond",
                target: "wet",
                actions: "reset_moisture_level",
              },
            },
          },
        },
      },
    },
  },
  {
    actions: {
      decrement_moisture_level: assign({
        moisture_level: ({ moisture_level, decrement_value_rate }, event) =>
          (moisture_level -= decrement_value_rate),
      }),
      increment_moisture_level: assign({
        moisture_level: ({ moisture_level, increment_value_rate }, event) =>
          (moisture_level += increment_value_rate),
      }),
      set_moisture_level_to_zero: assign({
        moisture_level: (context, event) => 0,
      }),
      reset_moisture_level: assign({ moisture_level: (context, event) => 100 }),
      sprinkle: () => {
        console.log("Sprinke!");
      },
    },
    guards: {
      wetCond: ({ moisture_level }: any, event) =>
        moisture_level <= 100 && moisture_level >= 60,
      moistCond: ({ moisture_level }: any, event) =>
        moisture_level < 60 && moisture_level >= 40,
      dryCond: ({ moisture_level }: any, event) =>
        moisture_level < 40 && moisture_level > 0,
      deadCond: ({ moisture_level }: any, event) => moisture_level <= 0,
    },
  }
);

export default sprinklerMachine;
