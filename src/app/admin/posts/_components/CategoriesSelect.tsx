"use client";
import * as React from 'react';
import Box from '@mui/material/Box'; // レイアウト調整
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';  // プルダウン
import Chip from '@mui/material/Chip';  // 選択済みタグ表示
import { SelectChangeEvent } from '@mui/material/Select' // Select の onChange イベント専用型。型推論の安全性を上げるために使用
import { Category } from '@/app/_types/Category'
import { useEffect } from 'react'

interface Props {
  selectedCategories: Partial<Category>[]    // 一部のデータ(id,name)だけでもOKに
  setSelectedCategories: (categories: Partial<Category>[] ) => void
}

export const CategoriesSelect: React.FC<Props> = ({
  selectedCategories = [],  // []初期値を指定でエラー防止
  setSelectedCategories,
}) => {
  const [categories, setCategories] = React.useState<Category[]>([])

  const handleChange = (event: SelectChangeEvent<number[]>) => {
    const value = event.target.value as number[]
    const selected = categories.filter((c) => value.includes(c.id))
    setSelectedCategories(selected)
  }

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch('/api/admin/categories')
      const { categories } = await res.json()
      setCategories(categories)
    }
    fetcher()
  }, [])


  // multiple … 複数選択可能に
  // valueの中身 … 選択中カテゴリのid配列
  // renderValue … 選択済み項目の表示方法をカスタマイズするためのMUIのプロップ
  // MenuItem … リスト項目として全カテゴリを描画
  return (
    <FormControl className="w-full">
      <Select
        multiple 
        value={selectedCategories.map((c) => c.id) as number[]}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selectedIds: number[]) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selectedIds.map((id) => {
              const category = categories.find((c) => c.id === id)
              return <Chip key={id} label={category?.name || ''} />
            })}
          </Box>
        )}
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
