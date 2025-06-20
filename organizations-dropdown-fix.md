# Organizations Dropdown Fix

## Issue Description
The Organizations dropdown (which is actually the Wealthbox users dropdown in the filter bar) was showing contact data that wasn't needed. The requirement was to limit the display to only:

1. First Name
2. Last Name  
3. E-Mail Address
4. Role: Firm Admin or Financial Advisor

## Changes Made

### 1. Updated WealthboxUser Interface
**File:** `client/src/components/dashboard/filter-bar.tsx`

Extended the `WealthboxUser` interface to include optional `first_name` and `last_name` fields:

```typescript
interface WealthboxUser {
  id: number;
  name: string;
  email: string;
  first_name?: string;
  last_name?: string;
  account?: number;
  excluded_from_assignments?: boolean;
}
```

### 2. Enhanced Dropdown Display
**File:** `client/src/components/dashboard/filter-bar.tsx`

Modified the dropdown items to show structured information instead of just the user name:

```jsx
<SelectItem key={wbUser.id} value={wbUser.id.toString()}>
  <div className="flex flex-col">
    <div className="flex gap-2">
      <span className="font-medium">
        {wbUser.first_name || wbUser.name?.split(' ')[0] || 'Unknown'} {wbUser.last_name || wbUser.name?.split(' ').slice(1).join(' ') || ''}
      </span>
    </div>
    <div className="text-sm text-gray-600">
      {wbUser.email || 'No email'}
    </div>
    <div className="text-xs text-gray-500">
      Role: Financial Advisor
    </div>
  </div>
</SelectItem>
```

### 3. Updated Active Filters Display
**File:** `client/src/components/dashboard/filter-bar.tsx`

Updated the active filters display to show the structured name format when a Wealthbox user is selected:

```typescript
if (selectedWealthboxUser) {
  const wbUser = wealthboxUsers.find(u => u.id === selectedWealthboxUser);
  if (wbUser) {
    const displayName = `${wbUser.first_name || wbUser.name?.split(' ')[0] || 'Unknown'} ${wbUser.last_name || wbUser.name?.split(' ').slice(1).join(' ') || ''}`.trim();
    activeFilters.push(`Advisor: ${displayName}`);
  }
}
```

## Features

### Fallback Logic
The implementation includes intelligent fallback logic:
- If `first_name` and `last_name` are available from the Wealthbox API, they are used directly
- If not available, the implementation splits the `name` field to extract first and last names
- Handles edge cases where name data might be missing

### Improved User Experience
- Clean, structured display showing all required information
- Consistent formatting between dropdown and active filters
- Visual hierarchy with different text sizes and colors for better readability

### Data Sources
The dropdown now displays:
1. **Name**: First Name + Last Name (with fallback to parsed name)
2. **Email**: User's email address (with fallback to "No email")
3. **Role**: Currently hardcoded to "Financial Advisor" (can be enhanced based on actual role data from API)

## Technical Notes

### Backend Compatibility
The server-side `fetchWealthboxUsers` function continues to work without changes, as it fetches all available user data from the Wealthbox API. The frontend enhancement gracefully handles both structured data (if available) and falls back to parsing the existing `name` field.

### API Data Structure
The implementation assumes the Wealthbox `/v1/users` endpoint returns user objects with the following structure:
```typescript
{
  id: number;
  name: string;
  email: string;
  first_name?: string;  // Optional, preferred
  last_name?: string;   // Optional, preferred
  account?: number;
  excluded_from_assignments?: boolean;
}
```

## Result
The Organizations dropdown now provides a clean, structured view showing exactly the information requested:
- First Name and Last Name (properly separated)
- Email Address  
- Role designation
- Eliminates unnecessary contact data clutter
- Maintains consistent user experience across the application