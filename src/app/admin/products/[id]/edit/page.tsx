import Breadcrumb from "@/components/Breadcrumb"
import ProductForm from "@/components/products/ProductForm"
import db from "@/db/db"

export default async function EditProduct({params:{id}}:{params:{id:string}}){
    const product = await db.product.findUnique({where:{id}})
    console.log(product)
    return (
        <div>
            <Breadcrumb breadcrumbs={[
                {label: "Products",href: "/admin/products",active: false},
                {label: "Edit",href: `/admin/products/edit/${id}`,active: true}
            ]}/>
            <ProductForm product = {product}/>
        </div>
    )
}