create table blog (
    categoryId varchar(40) not null
);

select * from article left join category on article.category_id = category.id;

select article.id , article.title, article.picture, article.text, article.category_id, category.name as category_name from article left join category on article.category_id = category.id;