update auth_role
set name = case code
  when 'customer_support' then 'Nhan vien cham soc khach hang va giao dich'
  when 'operations_staff' then 'Nhan vien van hanh backoffice'
  else name
end
where code in ('customer_support', 'operations_staff');

insert into user_role (user_id, role_id)
select distinct
  current_assignment.user_id,
  target_role.id
from user_role current_assignment
join auth_role source_role on source_role.id = current_assignment.role_id
join auth_role target_role on target_role.code = case
  when source_role.code in ('ticket_agent', 'finance_staff', 'content_editor') then 'customer_support'
  when source_role.code = 'system_admin' then 'operations_staff'
  else source_role.code
end
where source_role.code in ('ticket_agent', 'finance_staff', 'content_editor', 'system_admin')
on conflict do nothing;

delete from role_permission
where role_id in (
  select id
  from auth_role
  where code in ('customer_support', 'operations_staff')
);

insert into role_permission (role_id, permission_id)
select role.id, permission.id
from auth_role role
join auth_permission permission on (
  (role.code = 'customer_support' and permission.code in (
    'backoffice.sales',
    'backoffice.support',
    'backoffice.finance',
    'backoffice.cms'
  ))
  or (role.code = 'operations_staff' and permission.code in (
    'backoffice.operations',
    'backoffice.admin'
  ))
)
on conflict do nothing;

delete from auth_role
where code in ('ticket_agent', 'finance_staff', 'content_editor', 'system_admin');
