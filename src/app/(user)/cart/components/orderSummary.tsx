"use client";

import CalculatedPrice from "@/components/product/CalculatedPrice";
import { CheckoutAddPromoCode, CheckoutRemovePromoCode } from "@/gql/graphql";
import { useUserStore } from "@/store";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { addToast, Button, Input, Skeleton } from "@heroui/react";
import { IconDiscount } from "@tabler/icons-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function OrderSummary() {
  const { checkoutData, setCheckoutData } = useUserStore();
  console.log("data", checkoutData);
  const voucherData = checkoutData?.voucher;
  const voucherCode = checkoutData?.voucherCode;
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    if (voucherCode) setPromoCode(voucherCode);
  }, [voucherCode]);

  const [applyCoupon, { loading: couponApplying }] = useMutation<{
    checkoutAddPromoCode: CheckoutAddPromoCode;
  }>(couponCodeApplyMutation);

  const [removeCoupon, { loading: couponRemoving }] = useMutation<{
    checkoutRemovePromoCode: CheckoutRemovePromoCode;
  }>(couponCodeRemoveMutation);

  const handleCouponRemove = async () => {
    try {
      const res = await removeCoupon({
        variables: {
          id: checkoutData?.id,
          promoCode: promoCode,
        },
      });
      const errors = res.data?.checkoutRemovePromoCode.errors;
      if (errors && errors.length > 0) {
        errors.map((err) =>
          addToast({
            title: err.field,
            description: err.message,
            color: "warning",
          })
        );
        return;
      }
      addToast({
        title: "Promo Code has been Removed",
        description: "Your Promocode has been removed from your checkout",
        color: "warning",
      });
    } catch (e: any) {
      console.error(e);
      addToast({
        title: "Error Occured",
        description: "Unexpected Error Occured while removing coupon code",
        color: "danger",
      });
    }
  };

  const handleCouponApply = async () => {
    if (voucherData) {
      addToast({
        title: "Promo Code Already Applied",
      });
      return;
    }
    try {
      const res = await applyCoupon({
        variables: {
          id: checkoutData?.id,
          promoCode: promoCode,
        },
      });
      const errors = res.data?.checkoutAddPromoCode.errors;
      if (errors && errors.length > 0) {
        errors.map((err) =>
          addToast({
            title: err.field,
            description: err.message,
            color: "warning",
          })
        );
        return;
      }
      // If no error then it will have the checkout data in it
      setCheckoutData(res.data?.checkoutAddPromoCode?.checkout!);
    } catch (e: any) {
      console.error(e);
      addToast({
        title: "Error Occured",
        description: "Unexpected Error Occured while applying coupon code",
        color: "danger",
      });
    }
  };

  console.log("checkout", checkoutData?.discount);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Order Summary</h2>

      <table className="w-full border-separate border-spacing-y-4">
        <tbody>
          <tr>
            <td className="text-gray-600">Subtotal</td>
            <td className="text-right font-medium">
              {checkoutData?.totalPrice?.gross?.amount === undefined ? (
                <Skeleton className="w-12 h-6 float-end rounded-lg" />
              ) : (
                <>
                  <CalculatedPrice
                    price={
                      checkoutData?.totalPrice?.gross?.amount +
                      (checkoutData.discount?.amount ?? 0)
                    }
                    discountedPrice={checkoutData?.totalPrice?.gross?.amount}
                    discountAmount={checkoutData.discount?.amount ?? 0}
                  />
                  $
                </>
              )}
            </td>
          </tr>

          <tr>
            <td className="text-gray-600">Delivery Fee</td>
            <td className="text-right font-medium">
              {checkoutData?.totalPrice?.gross?.amount === undefined ? (
                <Skeleton className="w-12 h-6 float-end rounded-lg" />
              ) : (
                "$" + 0.0
              )}
            </td>
          </tr>

          <tr>
            <td colSpan={2}>
              <div className="flex gap-3 w-full">
                <Input
                  className="flex-1"
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  startContent={<IconDiscount size={18} />}
                />
                {!voucherData ? (
                  <Button
                    color="success"
                    isLoading={couponRemoving}
                    className="shrink-0"
                    onPress={handleCouponApply}
                  >
                    Apply
                  </Button>
                ) : (
                  <Button
                    color="danger"
                    isLoading={couponApplying}
                    className="shrink-0"
                    onPress={handleCouponRemove}
                  >
                    Remove
                  </Button>
                )}
              </div>
              {voucherData && (
                <p className="text-sm p-3 text-emerald-800 bg-emerald-100 mt-2 rounded-xl">
                  Applied Coupon Code: {voucherData?.name}
                  <br />
                  {voucherData?.discountValue}{" "}
                  {voucherData?.discountValueType === "PERCENTAGE" ? "%" : ""}{" "}
                  Discount Applied
                </p>
              )}
            </td>
          </tr>

          <tr>
            <td className="pt-4 text-lg font-semibold">Total</td>
            <td className="pt-4 text-right text-lg font-semibold">
              {checkoutData?.totalPrice?.gross?.amount === undefined ? (
                <Skeleton className="w-12 h-6 float-end rounded-lg" />
              ) : (
                <>
                  <CalculatedPrice
                    price={
                      checkoutData?.totalPrice?.gross?.amount +
                      (checkoutData.discount?.amount ?? 0)
                    }
                    discountedPrice={checkoutData?.totalPrice?.gross?.amount}
                    discountAmount={checkoutData.discount?.amount ?? 0}
                  />
                  $
                </>
              )}
            </td>
          </tr>

          <tr>
            <td colSpan={2}>
              <Button
                className="w-full h-12 text-base font-semibold"
                color="primary"
                as={Link}
                href="/cart/checkout"
              >
                Checkout
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const couponCodeApplyMutation = gql`
  mutation checkoutAddCoupon($id: ID!, $promoCode: String!) {
    checkoutAddPromoCode(checkoutId: $id, promoCode: $promoCode) {
      errors {
        code
        field
        message
      }
      checkout {
        id
        totalPrice {
          gross {
            amount
          }
          net {
            amount
          }
          tax {
            amount
          }
        }
        lines {
          id
          quantity
          totalPrice {
            gross {
              amount
            }
            net {
              amount
            }
            tax {
              amount
            }
          }
        }
        billingAddress {
          id
          firstName
          lastName
          companyName
          streetAddress1
          streetAddress2
          city
          cityArea
          postalCode
          country {
            country
          }
          countryArea
        }
        shippingAddress {
          id
          firstName
          lastName
          companyName
          streetAddress1
          streetAddress2
          city
          cityArea
          postalCode
          country {
            country
          }
          countryArea
        }
        shippingMethods {
          id
          name
          description
          minimumDeliveryDays
          maximumDeliveryDays
          price {
            amount
          }
        }
      }
    }
  }
`;

const couponCodeRemoveMutation = gql`
  mutation checkoutAddCoupon($id: ID!, $promoCode: String!) {
    checkoutRemovePromoCode(checkoutId: $id, promoCode: $promoCode) {
      errors {
        code
        field
        message
      }
      checkout {
        id
        totalPrice {
          gross {
            amount
          }
          net {
            amount
          }
          tax {
            amount
          }
        }
        lines {
          id
          quantity
          totalPrice {
            gross {
              amount
            }
            net {
              amount
            }
            tax {
              amount
            }
          }
        }
        billingAddress {
          id
          firstName
          lastName
          companyName
          streetAddress1
          streetAddress2
          city
          cityArea
          postalCode
          country {
            country
          }
          countryArea
        }
        shippingAddress {
          id
          firstName
          lastName
          companyName
          streetAddress1
          streetAddress2
          city
          cityArea
          postalCode
          country {
            country
          }
          countryArea
        }
        shippingMethods {
          id
          name
          description
          minimumDeliveryDays
          maximumDeliveryDays
          price {
            amount
          }
        }
      }
    }
  }
`;

export default OrderSummary;
