import { React } from "react";

const AboutUs = () => {
    return (
        <>
            <div>
                <p className="bread">
                    <span>Về chúng tôi</span>
                </p>
                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className="aboutus-box">
                            <div className="aboutus-card">
                                <p className="aboutus-tittle">Tra cứu dược liệu</p>
                                <p>Tiện lợi cho việc tra cứu các loại dược liệu
                                    hỗ trợ và điều trị bệnh gan bằng cách sử dụng ảnh,
                                    tra cứu bằng từ khoá và lọc theo các bệnh
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4" >
                        <div className="aboutus-box">
                            <div className="aboutus-card">
                                <p className="aboutus-tittle">Sản phẩm dược liệu từ thiên nhiên</p>
                                <p>Lá thuốc được lấy hoàn toàn
                                    từ thiên nhiên được sơ chế kĩ lưỡng
                                    đảm bảo chất lượng
                                    tốt nhất đến tay người tiêu dùng
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="aboutus-box">
                            <div className="aboutus-card">
                                <p className="aboutus-tittle">Vận chuyển và thanh toán</p>
                                <p>
                                    Phương thức thanh toán đơn giản, nhanh gọn.
                                    Vận chuyển nhanh chóng, đảm bảo sản phẩm vẫn giữ nguyên
                                    chất lượng khi đến tay khách hàng.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default AboutUs;