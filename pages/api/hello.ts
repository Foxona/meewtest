import useSWR from "swr";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   name: string;
// };

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ name: "John Doe" });
// }

// const fetcher = (...args) => fetch(...args).then((res) => res.json());

// function Profile () {
//   const { data, error } = useSWR('/api/user/123', fetcher)

//   if (error) return <div>failed to load</div>
//   if (!data) return <div>loading...</div>

//   // render data
//   return <div>hello {data.name}!</div>
// }
