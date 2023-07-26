# MyTrunkOfQuotes
A Registry of Wisdom and Motivation

Quotes can have a significant impact on our lives; a simple,
well-chosen phrase can ignite a spark of motivation, empathy,
or reflection in our hearts and minds. Their profound effect
lies in encapsulating powerful ideas and perspectives in a 
concise and memorable manner.

Project Description:
This project was developed using Angular with a backend-as-a-service
called Supabase, which is built on PostgreSQL and a REST API to streamline
development. The app allows users to authenticate through Supabase Auth
and add quotes to their collection, accessible from any device. It's important
to note that this application doesn't store any personal data with the quotes,
only an account ID to identify their respective quotes.

Supabase:
We utilize Supabase Auth for user login, Row-Level Security (RLS) 
to enforce rules on each row of the table regarding CRUD operations 
(Create, Read, Update, Delete). Finally, we establish a relationship 
between the authenticated user's table and the quotes table using a 
Foreign Key, a shared field in both tables.
