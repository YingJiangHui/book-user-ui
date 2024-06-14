import React, { memo } from "react";
import classNames from "classnames";
import { Form, FormProps, Input, InputProps, SpinLoading } from "antd-mobile";
import "./searchInput.less";
import { SearchOutline } from "antd-mobile-icons";
import { CompositionInput } from "@/components/ComposistionInput/ComposisitionInput";
import { useRequest, useSearchParams } from "@@/exports";
import { getSearchHistory, getSearchHistoryAll } from "@/service/search";

type props = {
  loading?: boolean;
  onlyDisplay?: boolean;
} & React.HTMLAttributes<HTMLDivElement> &
  InputProps &
  FormProps;
export type SearchInputProps = props;
export const SearchInput: React.FC<React.PropsWithChildren<SearchInputProps>> =
  memo((props) => {
    const {
      placeholder,
      loading,
      onlyDisplay,
      onFinish,
      form,
      onValuesChange,
      ...rest
    } = props;

    const [searchParams, setSearchParams] = useSearchParams();
    const searchHistoryReq = useRequest(getSearchHistoryAll, {
      manual: true,
      debounceInterval: 500,
    });
    if (onlyDisplay) {
      return (
        <div className={classNames("search-input")} {...rest}>
          <div className={classNames("search-input-content")}>
            {loading ? (
              <SpinLoading style={{ "--size": "22px" }} />
            ) : (
              <SearchOutline color={"#d6d6d6"} fontSize={24} />
            )}

            <Form.Item name={"keyword"} noStyle>
              {/*<Input placeholder={placeholder} />*/}
              <CompositionInput placeholder={placeholder} />
            </Form.Item>
            <button type={"submit"}>搜 索</button>
          </div>
        </div>
      );
    }
    return (
      <div className={classNames("search-input")} {...rest}>
        <Form
          form={form}
          initialValues={{ keyword: searchParams.get("keyword") }}
          onValuesChange={(changedValues, values) => {
            searchHistoryReq.run({ target: "BOOK", keyword: values.keyword });
            onValuesChange?.(changedValues, values);
          }}
          onFinish={(values) => {
            setSearchParams({ keyword: values.keyword }, { replace: true });
            onFinish?.(values);
          }}
        >
          <Form.Item dependencies={["keyword"]} noStyle>
            {(form) => {
              return (
                <>
                  <div
                    className={classNames(
                      "search-input-content",
                      searchHistoryReq.data?.length &&
                        form.getFieldValue("keyword") &&
                        "search-input-content-active"
                    )}
                  >
                    {loading ? (
                      <SpinLoading style={{ "--size": "22px" }} />
                    ) : (
                      <SearchOutline color={"#d6d6d6"} fontSize={24} />
                    )}

                    <Form.Item name={"keyword"} noStyle>
                      {/*<Input placeholder={placeholder} />*/}
                      <CompositionInput placeholder={placeholder} />
                    </Form.Item>
                    <button type={"submit"}>搜 索</button>
                    {searchHistoryReq.data?.length &&
                    form.getFieldValue("keyword") ? (
                      <div className={classNames("auto-complete")}>
                        {searchHistoryReq.data?.map((item) => (
                          <div
                            tabIndex={0}
                            className={classNames("auto-complete-item")}
                            onClick={() => {
                              form.setFieldsValue({ keyword: item.keyword });
                              form.submit();
                              searchHistoryReq.mutate(undefined);
                            }}
                          >
                            {item.keyword}
                          </div>
                        ))}
                      </div>
                    ) : undefined}
                  </div>
                </>
              );
            }}
          </Form.Item>
        </Form>
      </div>
    );
  });
SearchInput.displayName = "搜索输入框";
