##User API Documentation

**POST /user**
>
> *Create a new user.*
> 
> ARGUMENTS
> 
> > **username** *String*
> > > A unique username for this user. 

> RETURNS
>  > A JSON contains status, message and data.


**POST /user/bill**
>
> *Get a bill of user*
> 
> ARGUMENTS
> 
> > **username** *String*
> > > A username for the bill. 

> > **products** *Array*
> > > A array of products

> RETURNS
>  > A JSON contains status, message and data.

**PUT /user/:userId**
>
> *Update a user.*
> 
> ARGUMENTS
> 
> > **username** *String*
> > > A unique username for this user.  

> RETURNS
>  > A JSON contains status, message and data.

**Delete /user/:userId**
>
> *Delete a user.*


> RETURNS
>  > A JSON contains status, message and data.

**GET /user/:userId**
>
> *Get a user using it _id.*
> 

> RETURNS
>  > A JSON contains status, message and data.

**GET /user**
>
> *Get all user.*

> RETURNS
>  > A JSON contains status, message and data.