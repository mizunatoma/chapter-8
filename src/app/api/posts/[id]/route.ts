// /src/app/api/posts/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const GET = async (
  request: NextRequest, 
  { params }: { params: { id: string } }, // ここでリクエストパラメータを受け取る
) => {

  // paramsの中にidが入っているので、それを取り出す
  const { id } = params

  try {
    const post = await prisma.post.findUnique({  // .findUnique() は「1件だけ探す（主キーで検索）」という命令。
      where: { id: parseInt(id) }, // URLパラメータ（/api/posts/1 の "1"）は文字列なので、parseInt()で数値に変換。
      // SQLでいうと、[SELECT * FROM Post WHERE id = 1;]

      include: {
        postCategories: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    })
    return NextResponse.json({ status: 'OK', post: post }, { status: 200 })

    // postがない場合のハンドリング(500の解消)
    if (!post) {
      return NextResponse.json({ status: 'Not Found', post: null }, { status: 404 })
    }

  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 })
  }
} 




