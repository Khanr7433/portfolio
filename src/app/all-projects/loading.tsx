import LoadingSpinner from "@/components/LoadingSpinner";

export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <LoadingSpinner />
        </div>
    );
}
