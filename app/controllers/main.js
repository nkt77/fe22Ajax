$(document).ready(function() {
  var nguoiDungService = new NguoiDungService();

  getDanhSachNguoiDung();

  //Dom đến nút thêm mới để mở popup
  $("#btnThemNguoiDung").click(function() {
    $(".modal-title").html("Thêm người dùng");

    var footer = `
            <button id='btnThem' class="btn btn-success">Thêm</button>
        `;
    $(".modal-footer").html(footer);
  });

  //Nút sửa
  $("body").delegate(".btnSua", "click", function() {
    var footer = `
    <button id='btnCapNhat' class="btn btn-success">Cập nhật</button>
`;
    $(".modal-footer").html(footer);

    var taiKhoan = $(this).data("taikhoan");
    var nguoiDung = nguoiDungService.layThongTinNguoiDung(taiKhoan);

    /*
        Dom đến 6 ô input cập nhật lại dữ liệu từ biến nguoiDung.
    */
  });

  //Cập nhật người dùng
  $("body").delegate("#btnCapNhat", "click", function() {
    /* 
        Lấy dữ liệu từ 6 ô input
        Gọi đến phương thức nguoiDungService.capNhatNguoiDung(truyền vô người dùng cần sửa);
      */
  });

  //Thêm người dùng mới
  $("body").delegate("#btnThem", "click", function() {
    var taiKhoan = $("#TaiKhoan").val();
    var hoTen = $("#HoTen").val();
    var matKhau = $("#MatKhau").val();
    var email = $("#Email").val();
    var soDT = $("#SoDienThoai").val();
    var loaiNguoiDung = $("#loaiNguoiDung").val();

    var nguoiDung = new NguoiDung(
      taiKhoan,
      hoTen,
      matKhau,
      email,
      soDT,
      loaiNguoiDung
    );
    nguoiDungService.themNguoiDung(nguoiDung);
  });

  //Xóa người dùng
  $("body").delegate(".btnXoa", "click", function() {
    var taiKhoan = $(this).data("taikhoan");
    nguoiDungService.xoaNguoiDung(taiKhoan);
  });

  function getDanhSachNguoiDung() {
    nguoiDungService
      .layDanhSachNguoiDung()
      .done(function(data) {
        localStorage.setItem("DSND", JSON.stringify(data));
        taoBang(data);
      })
      .fail(function(err) {
        console.log(err);
      });
  }

  function taoBang(mang) {
    var content = "";
    mang.map(function(item, index) {
      content += `
              <tr>
                  <td>${index + 1}</td>
                  <td>${item.TaiKhoan}</td>
                  <td>${item.MatKhau}</td>
                  <td>${item.HoTen}</td>
                  <td>${item.Email}</td>
                  <td>${item.SoDT}</td>
                  <td>${item.TenLoaiNguoiDung}</td>
                  <td>
                      <button class="btn btn-primary btnSua" data-taikhoan="${
                        item.TaiKhoan
                      }" data-toggle="modal" data-target="#myModal">Sửa</button>
                      <button class="btn btn-danger btnXoa" data-taikhoan="${
                        item.TaiKhoan
                      }">Xóa</button>
                  </td>
              </tr>
          `;
    });

    $("#tblDanhSachNguoiDung").html(content);
  }
});
