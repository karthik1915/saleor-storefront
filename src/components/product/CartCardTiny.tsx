import React from "react";
import Image from "next/image";
import { CheckoutLine } from "@/gql/graphql";
import { addToast, Button, Card, Chip } from "@heroui/react";
import { IconTrash } from "@tabler/icons-react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { useCart } from "@/lib/hooks/useCart";
import { useUserStore } from "@/store";
import { useRouter } from "next/navigation";
import Link from "next/link";

function CartCardTiny({ line }: { line: CheckoutLine }) {
  const router = useRouter();
  const variant = line.variant;
  const variantName = variant.name === variant.id ? "default" : variant.name;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { deleteItemFromCart } = useCart();
  const removeCartItem = useUserStore((state) => state.removeLine);

  const handleDeleteItem = async () => {
    const res = await deleteItemFromCart([line.id]);
    removeCartItem(line.id);
    if (res) {
      addToast({
        title: "Item Deleted from Cart",
        color: "danger",
        description: "Your Item have been Deleted from Cart",
      });
    } else {
      addToast({
        title: "Cart item is not Removed",
        color: "danger",
        description: "Your Item is not removed from your cart",
      });
    }
    onClose();
  };

  return (
    <>
      <Card className="flex items-center rounded-xl pr-2 cursor-pointer flex-row">
        <div className="size-32">
          <Image
            src={
              variant.product.thumbnail?.url ||
              "/generic-image-placeholder.webp"
            }
            alt={variant.product.thumbnail?.alt || variant.product.name}
            width={142}
            height={142}
          />
        </div>
        <div className="flex-1 mx-2.5">
          <Link
            href={"/products/" + variant.product.slug}
            className="text-xl hover:underline block"
          >
            {variant.product.name}
          </Link>
          <Chip size="sm">{variantName}</Chip>
          <p className="text-neutral-600 italic">
            {line.quantity} X {line.unitPrice.gross.amount} ={" "}
            {line.totalPrice.gross.amount} {line.totalPrice.gross.currency}
          </p>
        </div>
        <div>
          <Button isIconOnly color="danger" variant="faded" onPress={onOpen}>
            <IconTrash />
          </Button>
        </div>
      </Card>
      <Modal backdrop={"opaque"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Are You Sure?</ModalHeader>
          <ModalBody>
            Are you sure you want to delete {variant.product.name} from your ?,
            this process is irreversible!
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="danger" onPress={handleDeleteItem}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CartCardTiny;
