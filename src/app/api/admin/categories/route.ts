// /src/app/api/admin/categories/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

// ===============================
// 一覧取得（GET）
// ===============================
export const GET = async (request: NextRequest) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy:{
        createdAt: 'desc',
      }
    })
    return NextResponse.json({ 
      status: 'OK', 
      categories, 
    },{ status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message },{ status: 400 })
    }
  }
}

// ===============================
// 新規作成（POST）
// ===============================
export interface CreateCategoryRequestBody {
  name: string,
}

export const POST = async (request: NextRequest) => {
  try {
    const body: CreateCategoryRequestBody = await request.json();
    const { name } = body;
    
    const data = await prisma.category.create({
      data: { name },
    })

    return NextResponse.json({ 
      status: 'OK', 
      message: '作成しました', 
      id: data.id ,
    },{ status: 200})
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message },{ status: 400 })
  }
}