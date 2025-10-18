// /src/app/api/admin/posts/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

// ===============================
// 一覧取得（GET）
// ===============================
export const GET = async (request: NextRequest) => {
  try {
    const posts = await prisma.post.findMany({
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
      orderBy: {
        createdAt: 'desc',
      }
    })
    return NextResponse.json({ status: 'OK', posts: posts }, { status: 200 })

  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 })
  }
}

// ===============================
// 新規作成（POST）
// ===============================

// 記事作成のリクエストボディの型
interface CreatePostRequestBody {
  title: string
  content: string
  categories: { id: number }[] // カテゴリーIDをいくつか持った配列を送る
  thumbnailUrl: string
}

export const POST = async (request: NextRequest, context: any) => {
  try {
    // リクエストのbodyを取得
    const body = await request.json()
    // フロントから送られてきたbodyを分解し、
    // 各変数に代入しながら、型をCreatePostRequestBodyとして保証している
    const { title, content, categories, thumbnailUrl }: CreatePostRequestBody = body
    // 投稿をDBに生成
    const data = await prisma.post.create({
      data: {
        title,
        content,
        thumbnailUrl,
      },
    })

    // 中間テーブルに記事に紐づく複数カテゴリを登録
    // sqliteではcreateManyが使えないので、for文1つずつ実施
    for (const category of categories) {
      await prisma.postCategory.create({
        data: {
          categoryId: category.id,
          postId: data.id,
        },
      })
    }

    return NextResponse.json({ status: 'OK', message: '作成しました', id: data.id}, { status: 200})

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400})
    }
  }
}


