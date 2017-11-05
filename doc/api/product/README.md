##Product API Documentation

**POST /product**
>
> *Create a new product.*
> 
> ARGUMENTS
> 
> > **code** *String*
> > > A unique code for this product. 

> >**name** *String*
> > > The name for this product.

> >**price** *Number*   
> > > The price for this product.

> RETURNS
>  > A JSON contains status, message and data.

**PUT /product/:productId**
>
> *Update a product.*
> 
> ARGUMENTS
> 
> > **code** *String*
> > > A unique code for this product. 

> >**name** *String*
> > > The name for this product.

> >**price** *Number*   
> > > The price for this product.

> RETURNS
>  > A JSON contains status, message and data.

**Delete /product/:productId**
>
> *Delete a product.*


> RETURNS
>  > A JSON contains status, message and data.

**GET /product/:productId**
>
> *Get a product using it _id.*
> 

> RETURNS
>  > A JSON contains status, message and data.

**GET /product**
>
> *Get all product.*

> RETURNS
>  > A JSON contains status, message and data.