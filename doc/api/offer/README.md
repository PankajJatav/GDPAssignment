##Offer API Documentation

**POST /offer**
>
> *Create a new offer.*
> 
> ARGUMENTS
> 
> > **product_id** *String*
> > > A _id of a product this offer. 

> > **name** *String*
> > > A unique offer name for this offer. 

> > **type** *String*
> > > A type of offer (FREE or DISCOUNT).

> > **code** *String*
> > > Code for the offer based on type ( PRICE and PERCENT for DISCOUNT and GOODS for FREE )

> > **offer_amount** *Number*
> > > A offer for the amount

> > **quantity** *Number*
> > > Min quantity for the offer


> RETURNS
>  > A JSON contains status, message and data.

**PUT /offer/:offerId**
>
> *Update a offer.*
> 
> ARGUMENTS
> 
> > **product_id** *String*
> > > A _id of a product this offer. 

> > **name** *String*
> > > A unique offer name for this offer. 

> > **type** *String*
> > > A type of offer (FREE or DISCOUNT).

> > **code** *String*
> > > Code for the offer based on type ( PRICE and PERCENT for DISCOUNT and GOODS for FREE )

> > **offer_amount** *Number*
> > > A offer for the amount

> > **quantity** *Number*
> > > Min quantity for the offer  

> RETURNS
>  > A JSON contains status, message and data.

**Delete /offer/:offerId**
>
> *Delete a offer.*

> RETURNS
>  > A JSON contains status, message and data.

**GET /offer/:offerId**
>
> *Get a offer using it _id.*
> 

> RETURNS
>  > A JSON contains status, message and data.

**GET /offer**
>
> *Get all offer.*

> RETURNS
>  > A JSON contains status, message and data.