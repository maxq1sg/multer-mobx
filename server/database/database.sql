create table Post(
    id bigserial not null primary key,
    post_text varchar(50) not null,
    post_date datetime,
    post_likes int
)

create table Files(
        file_id bigserial not null primary key,
        file_path varchar(100) not null,
        post_id int not null foreign key  references Post(id)
)