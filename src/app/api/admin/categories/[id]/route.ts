// /src/app/api/admin/categories/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

// ===============================
// 詳細取得（GET）
// ===============================
export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { id } = params;

  try { 
    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(id),
      },
    })

    return NextResponse.json({ status: 'OK', category },{ status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message },{ status: 400 })
    }
  }
}

// ===============================
// 記事更新（PUT）
// ===============================
interface UpdateCategoryRequestBody {
  name: string,
}

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { id } = params;

  const body = await request.json()
  const { name } :UpdateCategoryRequestBody = body

  try {
    const category = await prisma.category.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    })

  return NextResponse.json({
      status: 'OK',
      category,
    }, { status: 200 })
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 })
  }
}

// ===============================
// 記事削除（DELETE）
// ===============================
export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string} },
) => {
  const { id } = params;

  try {
    const category = await prisma.category.delete({
      where: {
        id: parseInt(id),
      },
    })

    return NextResponse.json({ status: 'OK', category },{ status: 200})
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message },{ status: 400})
  }

}














