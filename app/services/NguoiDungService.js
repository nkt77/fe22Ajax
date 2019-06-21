function NguoiDungService() {
  this.layDanhSachNguoiDung = function() {
    return $.ajax({
      url: "http://svcy.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung",
      type: "GET"
    });
  };

  this.themNguoiDung = function(nguoiDung) {
    $.ajax({
      url: "http://svcy.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung",
      type: "POST",
      data: nguoiDung
    })
      .done(function(data) {
        if (data === "tai khoan da ton tai !") {
          alert(data);
        } else {
          location.reload();
        }
      })
      .fail(function(err) {
        console.log(err);
      });
  };

  this.xoaNguoiDung = function(taiKhoan) {
    $.ajax({
      url: `http://svcy.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${taiKhoan}`,
      type: "DELETE"
    })
      .done(function(data) {
        console.log(data);
        location.reload();
      })
      .fail(function(err) {
        console.log(err);
      });
  };

  this.layThongTinNguoiDung = function(taiKhoan) {
    /*
        1. Lấy DSND từ LocalStorage
        2. Duyệt mảng bằng find => return về người dùng tìm thấy.
    */
  };

  this.capNhatNguoiDung = function(nguoiDung) {
    var ngd = JSON.stringify(nguoiDung);
    $.ajax({
      url: "http://svcy.myclass.vn/api/QuanLyTrungTam/CapNhatNguoiDung",
      type: "PUT",
      data: ngd,
      contentType: "application/json",
      dataType: "json"
    })
      .done(function(data) {
        console.log(data);
        location.reload();
      })
      .fail(function(err) {
        console.log(err);
      });
  };
}
