import { useState } from "react";

import { Modal } from "@/components/common/Modal";

import CustomerForm from "@/components/customers/customerForm";

import DashboardLayout from "@/layouts/DashboardLayout";

import { PageContainer } from "@/components/common/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { PageSection } from "@/components/common/PageSection";

import { useCustomers } from "@/hooks/useCustomers";
import CustomerTable from "@/components/customers/customerTable";
import { Button } from "@/components/common/Button";
import { EmptyState } from "@/components/common/EmptyState";
import { Plus } from "lucide-react";
import type { Customer } from "@/types/customer.types";

import CustomerSearch from "@/components/customers/customerSearch";
import CustomerDetails from "@/components/customers/CustomerDetails";
import CustomerStatement from "@/components/customers/CustomerStatement";

const CustomersPage = () => {
  const { data: customers, isLoading, error } = useCustomers();

  const [open, setOpen] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  const [detailsOpen, setDetailsOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [statementOpen, setStatementOpen] = useState(false);

  const filteredCustomers =
    customers?.filter((customer) => {
      const query = search.trim().toLowerCase();

      return (
        customer.firstName.toLowerCase().includes(query) ||
        customer.lastName.toLowerCase().includes(query) ||
        customer.phone.includes(query) ||
        customer.nationalId.includes(query) ||
        (customer.email ?? "").toLowerCase().includes(query)
      );
    }) ?? [];

  if (isLoading) {
    return (
      <DashboardLayout>
        <PageContainer>
          <PageHeader
            title="Customers"
            subtitle="Manage all registered customers"
            action={
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  setSelectedCustomer(null);
                  setOpen(true);
                }}
              >
                <Plus size={18} />
                Add Customer
              </Button>
            }
          />

          <PageSection>Loading customers...</PageSection>
        </PageContainer>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <PageContainer>
          <PageHeader
            title="Customers"
            subtitle="Manage all registered customers"
            action={
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  setSelectedCustomer(null);
                  setOpen(true);
                }}
              >
                <Plus size={18} />
                Add Customer
              </Button>
            }
          />

          <PageSection>Failed to load customers.</PageSection>
        </PageContainer>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageContainer>
        <PageHeader
          title="Customers"
          subtitle="Manage all registered customers"
          action={
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => {
                setSelectedCustomer(null);
                setOpen(true);
              }}
            >
              <Plus size={18} />
              Add Customer
            </Button>
          }
        />

        <PageSection>
          <div className="mb-6">
            <CustomerSearch value={search} onChange={setSearch} />
            <p className="mt-3 text-sm text-slate-500">
              Showing {filteredCustomers.length} of {customers?.length ?? 0}{" "}
              customers
            </p>
          </div>

          {customers && customers.length > 0 ? (
            <CustomerTable
              customers={filteredCustomers}
              onView={(customer) => {
                setSelectedCustomer(customer);
                setDetailsOpen(true);
              }}
              onEdit={(customer) => {
                setSelectedCustomer(customer);
                setOpen(true);
              }}
              onStatement={(customer) => {
                setSelectedCustomer(customer);
                setStatementOpen(true);
              }}
            />
          ) : (
            <EmptyState
              title={search ? "No matching customers" : "No customers found"}
              description={
                search
                  ? "Try searching with another name, phone number or National ID."
                  : "Create your first customer to get started."
              }
            />
          )}
        </PageSection>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title={selectedCustomer ? "Edit Customer" : "Add Customer"}
        >
          <CustomerForm
            customer={selectedCustomer ?? undefined}
            onCancel={() => {
              setSelectedCustomer(null);
              setOpen(false);
            }}
            onSuccess={() => {
              setSelectedCustomer(null);
              setOpen(false);
            }}
          />
        </Modal>
        <Modal
          open={detailsOpen}
          onClose={() => setDetailsOpen(false)}
          title="Customer Details"
        >
          {selectedCustomer && <CustomerDetails customer={selectedCustomer} />}
        </Modal>

        <Modal
          open={statementOpen}
          onClose={() => setStatementOpen(false)}
          title="Customer Statement"
        >
          {selectedCustomer && (
            <CustomerStatement customerId={selectedCustomer.id} />
          )}
        </Modal>
      </PageContainer>
    </DashboardLayout>
  );
};

export default CustomersPage;
