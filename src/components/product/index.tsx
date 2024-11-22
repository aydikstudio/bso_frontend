import React, { useState } from 'react';
import { Layout, Row, Col, Card, Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addBasket, deleteBasket, selectIsAuth } from '../../redux/slices/auth';



export interface IProduct {
  item: any
}




const Product = ({ item }: IProduct) => {




  const isInBasket = useSelector((state: any) => state.auth.data?.basket ? Boolean(state.auth.data.basket.find((item1: any) => item1.id == item.id)) : false)

  const dispatch = useDispatch<any>();

  const isAuth = useSelector(selectIsAuth)

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addBasketProduct = () => {

    if (isAuth) {
      dispatch(addBasket(item))
    } else {
      showModal()
    }
  }

  const deleteBasketProduct = () => {

    if (isAuth) {
      dispatch(deleteBasket(item))
    } else {
      showModal()
    }
  }

  return (
    <>

      <Card className='text-center' title={item?.title} bordered={false}>
        <p>${item?.price}</p>
        <p><img src={process.env.REACT_APP_IMAGE_URL + item?.image.url} width={100} height={100} className='m-auto' /></p>

        {isInBasket ? <Button color="danger" variant="outlined" className='mt-5' onClick={() => deleteBasketProduct()}>Remove</Button> :
          (<Button type="primary" className='mt-5' onClick={() => addBasketProduct()}>Add basket</Button>)}

      </Card>
      <Modal title="Attention" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Need sign in</p>
      </Modal>
    </>
  );
};

export default Product;