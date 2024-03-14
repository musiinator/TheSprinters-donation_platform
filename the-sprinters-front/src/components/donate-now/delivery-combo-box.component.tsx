import React, { useState } from 'react';
import { Combobox, useCombobox, Input, InputBase, ComboboxStore } from '@mantine/core';
import { DeliveryCompany } from '@/src/enums/DeliveryCompany';


interface DeliveryComboBoxProps {
    onSelect: (company: string) => void;
    initialValue?: string;
};

function DeliveryComboBox({ onSelect, initialValue }: DeliveryComboBoxProps) {
    const deliveryCompanies = [DeliveryCompany.FANCOURIER, DeliveryCompany.CARGUS, DeliveryCompany.SAMEDAY];
    const combobox: ComboboxStore = useCombobox({
        onDropdownClose: (): void => combobox.resetSelectedOption(),
    });

    const [selectedCompany, setSelectedCompany] = useState<string | null>(initialValue || null);

    const companyOptions = deliveryCompanies.map((company) => (
        <Combobox.Option value={company} key={company}>
            {company}
        </Combobox.Option>
    ));

    return (
        <Combobox
            store={combobox}
            onOptionSubmit={(val) => {
                onSelect(val);
                setSelectedCompany(val);
                combobox.closeDropdown();
            }}
        >
            <Combobox.Target>
                <InputBase
                    component="button"
                    type="button"
                    pointer
                    rightSection={<Combobox.Chevron />}
                    rightSectionPointerEvents="none"
                    onClick={() => combobox.toggleDropdown()}
                    style={{ width: '90%' }}
                >
                    {selectedCompany || <Input.Placeholder>Select Delivery Company</Input.Placeholder>}
                </InputBase>
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>{companyOptions}</Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}

export default DeliveryComboBox;
