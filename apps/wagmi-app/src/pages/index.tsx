import Link from "next/link";

import { Main } from "@/templates/Main";
import { Meta } from "@/templates/Meta";
import { AppConfig } from "@/utils/AppConfig";

const Index = () => {
  return (
    <Main
      meta={
        <Meta
          title={`${AppConfig.title} | ${AppConfig.description}`}
          description={AppConfig.description}
        />
      }
    >
      <div className="dark: mx-auto bg-gradient-to-br from-neutral-100 via-neutral-100 to-neutral-200 py-32 text-center text-neutral-500 shadow-sm dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-900 dark:text-white">
        <h1 className="m-0 mb-0 text-7xl font-bold">
          <span className="font-bold">MentorDAO{" "}</span>
        </h1>
        <h3 className="text-2xl font-light leading-4">
          MentorDAO is where junior developers get to learn and earn
        </h3>
      </div>
    </Main>
  );
};

export default Index;
