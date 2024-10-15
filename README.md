# expressjs-mvc

## Cách chạy chương trình

`npm start`

## Cấu trúc folder

Tuân theo cấu trúc Model - View - Controller, trong đó View thuộc về phía frontend, backend chỉ quan tâm model và controller


### Routes

Định nghĩa các endpoints cho chương trình và map các endpoints với các controllers.

### Controllers

Xử lý Request được gửi tới, bao gồm nhưng không giới hạn việc validate Request và gọi các service liên quan. Đây là một chương trình monolith nên gọi service nào cũng được.


### Models

Định nghĩa kiểu dữ liệu, và được dùng để tương tác với databases.

### Middlewares

Là các hàm được thực thi trong 1 vòng lặp request - response, sử dụng phổ biến ở lớp application (app.js), lớp routes(authenticate and authorize,...), lớp controllers (validate,.. tuy nhiên trong trường hợp này ta dùng models để validate).
