import { schedule } from "@netlify/functions";

export default async (req) => {
    const { next_run } = await req.json();

    const res = await fetch(
        `https://uhunt.onlinejudge.org/api/uname2uid/IskandarSubarashi`,
    ).then(async (res) => await res.json());

    let subs = await fetch(
        `https://uhunt.onlinejudge.org/api/subs-user/${res}`,
    ).then(async (res) => await res.json());

    console.log("Recieved event! Next invocation at: ", next_run);
    //const res = await ex.json();
    console.log(subs);
};

export const config = {
    schedule: "@hourly",
};
