import React from 'react';
import { Input, Button, Modal, Form } from 'antd';


interface IAddMaterialModalProps {
  onClickAdd: (values: { title: string, content: string }) => void,
  isVisible: boolean,
  onCancel: () => void,
}

export function AddMaterialModal({
  onClickAdd,
  isVisible,
  onCancel,
}: IAddMaterialModalProps) {
  return (
    <Modal
      title="Добавить новость"
      visible={isVisible}
      onCancel={onCancel}
      footer={false}
    >
      <Form
        name="login_form"
        initialValues={{
          remember: true,
        }}
        onFinish={onClickAdd}
        onFinishFailed={e => console.log(e)}
        onError={e => {}}
        style={{ padding: 32 }}
      >
        <Form.Item
          name="title"
          rules={[{
            required: true,
            message: 'Пожалуйста, введите заголовок материала!',
          }]}
        >
          <Input
            placeholder="Заголовок"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="content"
          rules={[{
            required: true,
            message: 'Пожалуйста, введите текст материала!',
          }]}
        >
          <Input.TextArea
            placeholder="Текст"
            size="large"
            style={{ height: 250 }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
          >
            Создать материал
          </Button>
        </Form.Item>
      </Form>
    </Modal>
   );
}

export default AddMaterialModal;
