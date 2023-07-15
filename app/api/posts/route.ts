import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { Prisma } from "@prisma/client";
import { useSearchParams } from "next/navigation";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "You are not logged in." }, { status: 401 });

    const currentUser = await prismadb.user.findUnique({
      where: {
        email: session.user?.email || "",
      },
    });
    if (!currentUser) return NextResponse.json({ message: "You are not logged in." }, { status: 401 });

    const { body } = await request.json();
    const post = await prismadb.post.create({
      data: {
        body,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An Error occurred" }, { status: 500 });
  }
}

export async function GET({ searchParams }: any) {
  try {
    // const userId = new URL(request.url).pathname.split("/").at(-1);
    // if (typeof userId !== "string") return NextResponse.json({ message: "Invalid ID" }, { status: 404 });
    // if (!userId) return NextResponse.json({ message: "Missing ID" }, { status: 404 });

    // console.log(123132132313213213213213232132132131231, new URL(request.url).pathname.split("/"));

    let posts;

    // const _args = {
    //   include: {
    //     user: true,
    //     comments: true,
    //   },
    //   orderBy: {
    //     createdAt: "desc",
    //   },
    // } as Prisma.UserArgs;

    // if (userId && typeof userId === "string") {
    //   posts = await prismadb.post.findMany({
    //     where: {
    //       userId,
    //     },
    //     include: {
    //       user: true,
    //       comments: true,
    //     },
    //     orderBy: {
    //       createdAt: "desc",
    //     },
    //   });
    // } else {
    posts = await prismadb.post.findMany({
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    // }

    // console.log(posts);

    // if (userId && typeof userId === "string") {
    //   posts = await prismadb.post.findMany({
    //     where: {
    //       userId,
    //     },
    //     ..._args,
    //   });
    // } else {
    //   posts = await prismadb.post.findMany(_args);
    // }

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An Error occurred" }, { status: 500 });
  }
}
