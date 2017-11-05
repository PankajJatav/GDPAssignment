##Discount API Documentation

**POST /discount**
>
> *Create a new discount.*
> 
> ARGUMENTS
> 
> > **product_id** *String*
> > > A _id of a product for this discount. 

> > **user_id** *String*
> > > A _id of a user for this discount

> > **expiry_date** *Date*
> > > Expiry date for the discount

> > **is_expire** *Boolean*
> > > Discount is expired or not

> > **is_active** *Boolean*
> > > discount is active or not


> RETURNS
>  > A JSON contains status, message and data.

**PUT /discount/:discountId**
>
> *Update a discount.*
> 
> ARGUMENTS
> 
> > **product_id** *String*
> > > A _id of a product this discount. 

> > **name** *String*
> > > A unique discount name for this discount. 

> > **type** *String*
> > > A type of discount (FREE or DISCOUNT).

> > **code** *String*
> > > Code for the discount based on type ( PRICE and PERCENT for DISCOUNT and GOODS for FREE )

> > **discount_amount** *Number*
> > > A discount for the amount

> > **quantity** *Number*
> > > Min quantity for the discount  

> RETURNS
>  > A JSON contains status, message and data.

**Delete /discount/:discountId**
>
> *Delete a discount.*

> RETURNS
>  > A JSON contains status, message and data.

**GET /discount/:discountId**
>
> *Get a discount using it _id.*
> 

> RETURNS
>  > A JSON contains status, message and data.

**GET /discount**
>
> *Get all discount.*

> RETURNS
>  > A JSON contains status, message and data.