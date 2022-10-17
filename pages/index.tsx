import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Billionairies } from "../service/bill";
import BillSvc from "../service/bill";

const Home: NextPage = () => {
  const [billionaireList, setBillionaireList] = useState<Billionairies[]>([]);

  useEffect(() => {
    BillSvc.GetBillionairesList()
      .then((data) => setBillionaireList(data))
      .catch((e) => console.log(e));
  }, []);

  if (billionaireList.length == 0) {
    return <div>No data</div>;
  }

  return (
    <div className="w-full h-screen overflow-y-auto p-36 pt-28 bg-slate-700">
      <p className="text-center font-bold text-7xl mb-16 text-white drop-shadow-lg">
        Billionaires
      </p>
      <div className="w-full grid grid-cols-4 grid-flow-row gap-9 justify-items-center">
        {billionaireList.map((v) => (
          <Link key={v.id} href={`/person/${v.id}`}>
            <a key={v.id} className="relative w-52 h-52">
              <Image
                src={v.squareImage}
                layout="fill"
                alt={v.id}
                unoptimized={true}
                className="rounded-3xl"
              />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
