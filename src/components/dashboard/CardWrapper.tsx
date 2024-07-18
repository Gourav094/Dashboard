import db from '@/db/db'
import { formatCurrency, formatNumber } from '@/lib/formatters'
import React from 'react'
import { CiBank } from 'react-icons/ci'
import { IoCartOutline } from 'react-icons/io5'
import { MdOutlineForwardToInbox } from 'react-icons/md'
import { TbUsersGroup } from 'react-icons/tb'
  
async function getSalesData() {
    const data = await db.order.aggregate({
        _sum: { soldPrice: true },
        _count: true
    })
    return {
        amount: (data._sum.soldPrice || 0) / 100,
        totalSalesCount: data._count
    }
}

async function getUserData(){
    const [userCount,orderValue] = await Promise.all([
        db.user.count(), 
        db.order.aggregate({
            _sum: {soldPrice:true}
        })
    ])
    return {
        userCount,
        avgOrderValue:userCount === 0 ? 0 : (orderValue._sum.soldPrice || 0)/userCount
    }
}

async function getProductData(){
    const [total,active] = await Promise.all([
        db.product.count(),
        db.product.count({ where : {isAvailable:true}})
    ])
    return {
        total,active
    }
}

async function getCouponData() {
    const [total,active] = await Promise.all([
        db.coupon.count(),
        db.coupon.count({where: {isAvailable:true}})
    ])
    return {total,active}
}

export default async function CardWrapper (){
    const [salesData,userData,productData,couponData] = await Promise.all([
        getSalesData(),
        getUserData(),
        getProductData(),
        getCouponData()
    ])

    return (
        <>
            <Card title="Collected" total = {formatCurrency(salesData.amount)} icon={<CiBank />}/>
            <Card title="Total Invoices" total = {formatNumber(salesData.totalSalesCount)} icon={<MdOutlineForwardToInbox/>}/>
            <Card title="Total Products" total = {formatNumber(productData.total)} icon={<IoCartOutline/>}/>
            {/* <Card title="Total Products" total = {formatNumber(couponData.total)}/> */}
            <Card title="Total Users" total = {formatNumber(userData.userCount)} icon ={<TbUsersGroup/>}/>
        </>
    )
}

type CardProps = {
    title: string
    total: string
    icon: any
}

export function Card({title,total,icon} : CardProps) {
    return (
        <div className='rounded-xl bg-gray-50 shadow p-2'>
            <div className='flex p-4'>
                <span>{icon  }</span>
                <h3 className="ml-2 text-sm font-medium">{title}</h3>
            </div>
            <p className='bg-white py-6 px-4 text-center text-2xl trucate'>{total}</p>
        </div>
    )
}