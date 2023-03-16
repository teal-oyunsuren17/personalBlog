create table blog (categoryId varchar(40) not null);

select
    *
from
    article
    left join category on article.category_id = category.id;

select
    article.id,
    article.title,
    article.picture,
    article.text,
    article.category_id,
    category.name as category_name
from
    article
    left join category on article.category_id = category.id;

select
    *
from
    customers
where
    customerNumber = (
        select
            customerNumber,
            orderNumber
        from
            orders
        where
            orderNumber = (
                select
                    orderNumber,
                    sum(quantityOrdered)
                from
                    orderdetails
                group by
                    orderNumber
                order by
                    sum(quantityOrdered) desc
                limit
                    1;

)
);