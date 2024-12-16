import axios from 'axios';
import { useState, useRef } from 'react';
import { Tabs, Card, Loader, ComboboxItem, FileButton, Paper, Image, Button, Group, Text, Stack, Select} from '@mantine/core';

//const API_BASE_URL = 'http://localhost:5000';
//const API_BASE_URL = 'https://vtqn-image-captioning-be.fayedark.com'
const API_BASE_URL = 'https://image-captioning-be.votaquangnhat.com'

function UploadImage() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const resetRef = useRef<() => void>(null);
  const [caption, setCaption] = useState<string | null>(null);
  const [captionbuttontext, setCaptionbuttontext] = useState<string | null>("Generate Caption");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<ComboboxItem | null>(null);
  const [data, setData] = useState<string | null>(null);

  const modelOptions = [
    { value: "dumb", label: "Dumb Model" },
    { value: "trans", label: "Transformer Model" },
    { value: "transpre", label: "Transformer Model Pre" },
    { value: "cnnlstm", label: "VGG16 + LSTM" },
  ];

  const handleImageChange = (image: File | null) => {
    setImage(image);
    setCaptionbuttontext("Generate Caption");

    if (image) {
      setPreview(URL.createObjectURL(image));
    } else {
      setPreview(null);
    }
  };

  const clearImage = () => {
    setImage(null);
    setPreview(null);
    setCaption(null);
    setCaptionbuttontext("Generate Caption");
    setLoading(false)
    resetRef.current?.();
  };

  const handleSubmit = async () => {
    if (image && selectedModel) {
        setCaption("Generating...")
        setLoading(true)
        const formData = new FormData();
        formData.append("image", image);
        formData.append("model", selectedModel.value);

        try {
          const response = await axios.post(`${API_BASE_URL}/caption`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          setCaption(response.data.caption);
          setData(JSON.stringify(response.data, null, 2));
        } catch (err) {
          setCaption("Failed to generate caption. Please try again.");
        } finally {
          setLoading(false)
          setCaptionbuttontext("Regenerate")
        }
    }
  }

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="center">
          <FileButton resetRef={resetRef} onChange={handleImageChange} accept="image/png,image/jpeg">
            {(props) => <Button {...props}>Upload image</Button>}
          </FileButton>
          <Button disabled={!image} color="red" onClick={clearImage}>
            Reset
          </Button>
          <Button disabled={loading || !image || !selectedModel} color="green" onClick={handleSubmit}>
            {loading ? <Loader size="sm" /> : captionbuttontext}
          </Button>
        </Group>
        <Select
          label="Select Model"
          placeholder="Choose model"
          value={selectedModel ? selectedModel.value : null}
          onChange={(_value, option) => setSelectedModel(option)}
          data={modelOptions}
          mt="md"
        />
        {image && (
          <Text size="sm" ta="center" mt="sm">
            Image name: {image.name}
          </Text>
        )}
        {preview && (
          <Stack
          h={400}
          w={400}
          bg="var(--mantine-color-body)"
          align="stretch"
          justify="center"
          gap="md"
          >
            <Image 
              src = {preview}
              radius="sm"
              h={200}
              w="auto"
              fit="contain"
            />

            <Paper shadow="lg" withBorder p="xl">
              <Tabs orientation="vertical" defaultValue="caption">
                <Tabs.List>
                  <Tabs.Tab value="caption" >
                    Caption
                  </Tabs.Tab>
                  <Tabs.Tab value="json" >
                    Json
                  </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="caption">
                  {caption}
                </Tabs.Panel>

                <Tabs.Panel value="json">
                  {data}
                </Tabs.Panel>
              </Tabs>
            </Paper>
          </Stack>
        )}
      </Card>
    </>
  );
}

export default UploadImage